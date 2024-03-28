// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

console.log("Hello from Functions!");

Deno.serve(async (req) => {
  const { id: wordId, lang, word } = await req.json();

  console.log("AAAA");

  return new Response("PPP", { headers: { "Content-Type": "application/json" } });
});
