async function openCloseSubject(subjectId, status, reload, setReload) {
  let newStatus = status;
  if (status) newStatus = 0;
  else newStatus = 1;
  fetch(`${import.meta.env.VITE_BACKEND_URL}/api/subjects/${subjectId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      status_resolve: newStatus,
    }),
  })
    .then((response) => {
      if (response.ok) {
        setReload(!reload);
      } else {
        throw new Error("erreur interne serveur");
      }
    })
    .catch((err) => console.error("Erreur : ", err));
}

export default openCloseSubject;
