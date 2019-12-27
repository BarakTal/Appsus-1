import emailService from '../services/emailService.js'
import EmailDetail from '../emailCmp/EmailDetail.jsx'

export default class EmailDetailPage extends React.Component {
    state = {
        email: null
    }

    componentDidMount() {
        this.loadEmail();
    }

    loadEmail() {
        const { id } = this.props.match.params;
        
        emailService.getEmailById(id).then(email => {
            emailService.changeIsRead(email);
            this.setState({ email })
            this.getUnReadCount()
        })
    }

    goBack = () => { //if sent go back to sent, get it from match.. 
        this.props.history.push('/email/inbox')
    }

    getUnReadCount = () => {
        emailService.getUnReadCount().then(count => { this.props.setUnReadCount(count) })
    }

    onDelete = (email)=>{
        emailService.deleteEmail(email).then(()=>{
            this.props.history.push('/email/inbox')
        });
    }

    render() {
        if (!this.state.email) return <div className="loading"> Loading...</div>
        return <EmailDetail email={this.state.email} delete={() => this.onDelete(this.state.email)} goBack={this.goBack}></EmailDetail>
    }
}