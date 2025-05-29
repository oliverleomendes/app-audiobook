export async function fetchAudiobooks() {
  const res = await fetch("http://localhost/api-audiobook/livros/listar.php");
  const data = await res.json();
  return data.livros;
}