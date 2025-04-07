export default function ClientList({ clients }) {
  return (
    <div>
      <h2>Client List</h2>
      {clients.length === 0 ? (
        <p>No clients added.</p>
      ) : (
        <ul>
          {clients.map((c) => (
            <li key={c.id}>
              {c.name} — {c.email} {c.phone && `(${c.phone})`}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
