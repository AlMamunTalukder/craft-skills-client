// // lib/deleteItem.ts
// export async function deleteItem(model: string, id: string) {
//   const res = await fetch(`/api/${model}/${id}`, {
//     method: "DELETE",
//   });

//   if (!res.ok) {
//     const error = await res.json().catch(() => ({}));
//     throw new Error(error.message || `Failed to delete ${model}`);
//   }

//   return res.json();
// }
