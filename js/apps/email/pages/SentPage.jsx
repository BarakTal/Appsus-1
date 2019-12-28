import emailService from "../services/emailService.js";
import EmailList from "../emailCmp/EmailList.jsx";
import Search from "../../apps cmps/Search.jsx";
import FilterEmail from "../emailCmp/FilterEmail.jsx";
import SortEmail from "../emailCmp/SortEmail.jsx";
import DeleteSelection from "../emailCmp/DeleteSelection.jsx";
import AddStarSelection from "../emailCmp/AddStarEmail.jsx";
import ReadStatusSelection from "../emailCmp/ReadStatusEmail.jsx";

export default class SentPage extends React.Component {
    state = {
        emails: [],
        filterBy: '',
        filterStatus: 'isAll',
        sortBy: 'date',
        selectedUnRead: false,
        selectedUnStar: false
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

    goToDetails = (emailId) => {
        this.props.history.push(`/email/${emailId}`)
    }

    render() {
        return <main>
            <div className="settings-container">
                <Search filterBy={this.state.filterBy} handleChange={this.handleSearchChange}></Search>
                <FilterEmail filterStatus={this.state.filterStatus} handleChange={this.handleStatusChange}></FilterEmail>
                <SortEmail sortBy={this.state.sortBy} handleChange={this.handleSortChange}></SortEmail>
                <ReadStatusSelection selectedUnRead={this.state.selectedUnRead} updateIsReadSelected={this.updateIsReadSelected}></ReadStatusSelection>
            </div>
            <DeleteSelection 
                deleteSelected={this.deleteSelected}>
            </DeleteSelection>
            <AddStarSelection
                selectedUnStar={this.state.selectedUnStar} updateIsStarredSelected={this.updateIsStarredSelected}>
            </AddStarSelection>
            <EmailList 
                goToDetails={this.goToDetails} 
                toggleStarred={this.toggleStarred}
                toggleSelection={this.toggleSelection}
                emails={this.state.emails}>
            </EmailList>
        </main>
    }
}