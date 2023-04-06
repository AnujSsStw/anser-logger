import axios from "axios";
import { log } from "console";
import { marked } from "marked";
import TerminalRenderer from "marked-terminal";

const client = axios.create({
  baseURL: "https://api.stackexchange.com/2.3",
});

marked.setOptions({
  // Define custom renderer
  renderer: new TerminalRenderer(),
});

const main = async (e: any) => {
  const error = { error: e.stack.split("\n") };
  const err = error.error[0];

  const res = await client.get(
    `/search/advanced?order=desc&sort=relevance&q=${err}&closed=True&site=stackoverflow&filter=!nOedRLr0Wi`
  );

  const data = res.data;

  const ansId = data.items
    .map((i: any) => {
      return i.accepted_answer_id;
    })
    .filter((i: any) => i !== undefined)
    .slice(0, 3)
    .join(";");

  const ans = await client.get(
    `/answers/${ansId}?order=desc&sort=activity&site=stackoverflow&filter=!nOedRLr0Wi`
  );

  ans.data.items.forEach((i: any) => {
    log(
      "ans you might found about this  \n",
      marked(i.body_markdown, {
        gfm: true,
        breaks: true,
      })
    );
  });
};

export default main;
