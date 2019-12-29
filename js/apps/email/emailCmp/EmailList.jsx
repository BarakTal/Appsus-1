'use strict'

import EmailPreview from "./EmailPreview.jsx";


export default class EmailList extends React.Component {

    render() {
        return (
            <div className="emails-container">
                <ul className="email-container clean-list">
                    {this.props.emails.map(email =>
                        <EmailPreview
                            goToDetails={this.props.goToDetails}
                            toggleStarred={this.props.toggleStarred}
                            toggleSelection={this.props.toggleSelection}
                            key={email.id}
                            email={email}>
                        </EmailPreview>
                    )}
                </ul>
            </div>
        )
    }
}