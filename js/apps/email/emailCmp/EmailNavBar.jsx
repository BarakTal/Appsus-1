const { NavLink } = ReactRouterDOM

export default function NavBar(props) {
    return <nav className="email-nav">
        <ul className="flex column">
            <li>
                <NavLink activeClassName="active" to='/email/inbox' exact>inbox <span>{props.unReadCount}</span></NavLink>
            </li>
            <li>
                <NavLink activeClassName="active" to='/email/sent' exact>sent</NavLink>
            </li>
        </ul>
    </nav>
}