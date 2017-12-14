import React from 'react';
import { Segment, Form, Tab, Modal, Header, Button, Icon } from 'semantic-ui-react';

import './Main.css';
import AnswerForm from '../../components/AnswerForm';
import AnswersList from '../../components/AnswersList';
import { NO_ANSWER } from '../../constants';

const FB = window.FB;

export default class Main extends React.Component {

    constructor(props) {
        super(props);
        this.onAnswerSubmit = this.onAnswerSubmit.bind(this);
        this.onAnswerItemClick = this.onAnswerItemClick.bind(this);
        this.state = { modalFor: {} };
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
            { menuItem: 'All answers', render: () => <Tab.Pane attached={false}><AnswersList onItemClick={this.onAnswerItemClick} answers={this.state.answers} /></Tab.Pane> },
        ];
        return (
            <div className='l-main'>
                <Tab menu={{ secondary: true }} panes={panes} />
                <Modal open={this.state.showModal} basic size='small'>
                    <Header icon='alarm outline' content='Confirm' />
                    <Modal.Content>
                        <p>Я, {this.state.modalFor.userName} хочу отказаться от своего решения и удалить свой ответ</p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='red' inverted onClick={() => this.removeAnswer(this.state.modalFor.id)}>
                            <Icon name='checkmark' /> Да
                        </Button>
                        <Button color='grey' inverted onClick={() => this.setState({ showModal: false })}>
                            <Icon name='checkmark' /> Нет
                        </Button>
                    </Modal.Actions>
                </Modal>
            </div>
        );
    }

    onAnswerSubmit(answer) {
        const answers = JSON.parse(localStorage.answers || '{}');
        answers[answer.id] = answer;
        localStorage.answers = JSON.stringify(answers);
        this.setState({ answer, answers: Object.values(answers) });
    }

    onAnswerItemClick(answer) {
        this.setState({
            showModal: true,
            modalFor: answer
        });
    }

    removeAnswer(id) {
        const answers = JSON.parse(localStorage.answers || '{}');
        const answer = answers[id];
        answer.decision = NO_ANSWER;
        localStorage.answers = JSON.stringify(answers);
        this.setState({ answer, answers: Object.values(answers), showModal: false });
    }
}
