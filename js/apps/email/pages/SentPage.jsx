import emailService from "../services/emailService.js";
import EmailList from "../emailCmp/EmailList.jsx";
import Search from "../../apps cmps/Search.jsx";
import FilterEmail from "../emailCmp/FilterEmail.jsx";
import SortEmail from "../emailCmp/SortEmail.jsx";

export default class SentPage extends React.Component {
    state = {
        emails: [],
        filterBy: '',
        filterStatus: 'isAll',
        sortBy: 'date'
    }

    componentDidMount() {
        this.loadEmails();
    }


    handleChange = (changeFilter) => {
        this.setState({ filterBy: changeFilter }, this.loadEmails)
    }

    handleStatusChange = (changeFilter) => {
        this.setState({ filterStatus: changeFilter }, this.loadEmails)
    }

    handleSortChange = (changeSort) => {
        this.setState({ sortBy: changeSort }, this.loadEmails)
    }


    loadEmails = () => {
        emailService.query(this.state.filterBy, this.state.filterStatus, this.state.sortBy).then(emails => { this.setState({ emails }) })
    }
    render() {
        return <main>
            <div className="settings-container">
                <Search filterBy={this.state.filterBy} handleChange={this.handleChange}></Search>
                <FilterEmail filterStatus={this.state.filterStatus} handleChange={this.handleStatusChange}></FilterEmail>
                <SortEmail sortBy={this.state.sortBy} handleChange={this.handleSortChange}></SortEmail>
            </div>
            <EmailList emails={this.state.emails}></EmailList>
        </main>
    }
}