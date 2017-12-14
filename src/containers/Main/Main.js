import React from 'react';
import { Segment, Form, Tab } from 'semantic-ui-react';

import './Main.css';
import AnswerForm from '../../components/AnswerForm';
import AnswersList from '../../components/AnswersList';
import { NO_ANSWER } from '../../constants';

const FB = window.FB;

export default class Main extends React.Component {

    constructor(props) {
        super(props);
        this.onAnswerSubmit = this.onAnswerSubmit.bind(this);
        this.state = {};
    }

    componentWillMount() {
        const { fb } = this.props;
        fb.then(api => api.getLoginStatus(res => {
            if (res.status !== 'connected') {
                // api.login();
            }
        }));
        let answers = JSON.parse(localStorage.answers || '{}');
        if (Object.values(answers).length === 0) {
            localStorage.currentUserId = new Date().getTime();
        }
        const answer = answers[localStorage.currentUserId] || { id: localStorage.currentUserId };        
        answers = Object.values(answers);
        answers.forEach((answer) => {
            answer.isFromCurrentUser = localStorage.currentUserId === answer.id;
        });
        this.setState({ answers, answer });
    }

    render() {
        const panes = [
            { menuItem: 'My answer', render: () => <Tab.Pane attached={false}><AnswerForm answer={this.state.answer} onSubmit={this.onAnswerSubmit} /></Tab.Pane> },
            { menuItem: 'All answers', render: () => <Tab.Pane attached={false}><AnswersList answers={this.state.answers} /></Tab.Pane> },
        ];
        return (
            <div className='l-main'>
                <Tab menu={{ secondary: true }} panes={panes} />
            </div>
        );
    }

    onAnswerSubmit(answer) {
        const answers = JSON.parse(localStorage.answers || '{}');
        answers[answer.id] = answer;
        localStorage.answers = JSON.stringify(answers);
        this.setState({ answer, answers: Object.values(answers) });
    }
}
