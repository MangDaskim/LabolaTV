export const onRequestGet = async ({ params }) => {
  const short = params.short;

  const response = await fetch(`https://script.google.com/macros/s/AKfycbwAFnUirbes2Qdq-4Av-jEA_QKqe2dOR-2dI9Fpkv6kwkb4xKA43ooxNBZJQZ28Q6QMzw/exec?short=${short}`);
  const url = await response.text();

  if (url === "NOT_FOUND") {
    return new Response("URL Not Found", { status: 404 });
  }

  return Response.redirect(url, 301);
};
