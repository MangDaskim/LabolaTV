export const onRequestPost = async ({ request }) => {
  const { url } = await request.json();

  const response = await fetch("https://script.google.com/macros/s/AKfycbwAFnUirbes2Qdq-4Av-jEA_QKqe2dOR-2dI9Fpkv6kwkb4xKA43ooxNBZJQZ28Q6QMzw/exec", {
    method: "POST",
    body: JSON.stringify({ url }),
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();
  const shortUrl = `https://labolatv.pages.dev/${data.short}`;

  return new Response(JSON.stringify({ shortUrl }), {
    headers: { "Content-Type": "application/json" },
  });
};
