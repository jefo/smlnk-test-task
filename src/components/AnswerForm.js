import React from 'react';
import { Form, Button, Segment, Modal, Header, Icon } from 'semantic-ui-react';
import { NO_ANSWER, WILL_COME, WILL_NOT_COME } from '../constants';

export default class AnswerForm extends React.Component {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
    }

    componentWillMount() {
        let answer = Object.assign({}, this.props.answer);
        if (!answer.withMe) {
            answer.withMe = 0;
        }
        this.setState(answer);
    }

    render() {
        const decisions = [
            { key: -1, text: 'Need decide', value: NO_ANSWER },
            { key: 0, text: 'I will come', value: WILL_COME },
            { key: 1, text: 'I will not come', value: WILL_NOT_COME }
        ];
        let resultMsg;
        let resultMsgColor;
        if (this.state.decision !== NO_ANSWER) {
            resultMsg = 'Saved.'
            resultMsgColor = 'green';
        } else {
            resultMsg = 'Answer removed.'
            resultMsgColor = 'red';
        }
        return (
            <Form>
                {this.state.isSubmit ? <Segment inverted color='green'>Saved.</Segment> : null}
                <Form.Input name='id' label='id' onChange={this.handleChange} value={this.state.id} />
                <Form.Input name='userName' label='Me' onChange={this.handleChange} value={this.state.userName} />
                <Form.Group inline>
                    <label>With me</label>
                    <Form.Input name='withMe' type='number' min="0" onChange={this.handleChange} value={this.state.withMe} />
                </Form.Group>
                <Form.Select name='decision' options={decisions} onChange={this.handleSelectChange} value={this.state.decision} />
                <Button type='submit' onClick={this.onSubmit}>Send</Button>
                <Modal open={this.state.remind} basic size='small'>
                    <Header icon='alarm outline' content='Reminder' />
                    <Modal.Content>
                        <p>Please, don`t forget give an answer!</p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='grey' inverted onClick={() => this.setState({ remind: false })}>
                            <Icon name='checkmark' /> Ok
                        </Button>
                    </Modal.Actions>
                </Modal>
            </Form>
        )
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    handleSelectChange(e, { name, value }) {
        this.setState({
            [name]: value
        });
    }

    onSubmit() {
        const answer = {
            id: this.state.id,
            userName: this.state.userName,
            decision: this.state.decision,
            withMe: this.state.withMe
        };
        this.props.onSubmit(answer);
        let newState = {
            isSubmit: true,
            remind: this.state.decision === NO_ANSWER
        };
        this.setState(newState);
    }
}
