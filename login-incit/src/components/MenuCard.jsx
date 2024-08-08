function MenuCard({ name, isActive }) {
    return (
        <div className={`rowMenuCard ${isActive ? `active` : ``}`}>
            <h3>{name}</h3>
        </div>
    )
}

export default MenuCard
