export default function Stats({ stats }) {
  const _stats = new Map();
  stats.forEach((entry) => _stats.set(entry.stat.name, entry.base_stat));
  //   console.log(_stats);

  const popStats = () => {
    return stats.map((entry, i) => {
      return (
        <li key={i}>
          <span>{entry.stat.name}</span>
          <span>{entry.base_stat}</span>
        </li>
      );
    });
  };

  return (
    <section id="poke-stats" data-section-title="Stats">
      <h3>Stats</h3>
      <ul>{popStats()}</ul>
    </section>
  );
}
