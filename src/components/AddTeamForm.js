export default function AddTeamForm({ team, onSubmit }) {
  return (
    <form
      id="addTeamForm"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <h2>Add Team</h2>
      <label htmlFor="team-name">
        <h4>Name</h4>
        <input name="team-name" type="text" required />
      </label>
      <button>Add</button>
    </form>
  );
}
