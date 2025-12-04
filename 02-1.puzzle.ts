(() => {
  void puzzle2();
})();

export async function puzzle2() {
  const textData = await Deno.readTextFile("./02.data.txt");
  console.log(textData);
}
