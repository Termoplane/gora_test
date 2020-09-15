const state = {
  name: "Студия", // If user already logged in, we could grab information about user in App.vue created() hook for example. This state is just a plug.
  surname: "Гора",
  photo: "Doge.png",
  about: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
}

const getters = {
  user_name: s => s.name,
  user_surname: s => s.surname,
  user_photo: s => s.photo,
  user_about: s => s.about
}

export default {
  state,
  getters
}