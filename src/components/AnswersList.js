import { List, Button, Icon, Image, Label, Header } from 'semantic-ui-react';
import { NO_ANSWER, WILL_COME, WILL_NOT_COME } from '../constants';

const Answer = ({ answer, onClick }) => {
    let answerColor;
    let iconName;
    let title;
    if(answer.decision === WILL_COME) {
        answerColor = 'green';
        iconName = 'checkmark';
        title = 'Will come';
    } else {
        answerColor = 'red';
        iconName = 'minus';
        title = 'Will not come';
    }
    return (
        <List.Item onClick={() => onClick(answer)} className={answer.id === localStorage.currentUserId? 'answer-item_current-user': ''} title={title}>
            <List.Content floated='right'>
                <Icon name={iconName} color={answerColor} size='large' />
                {answer.decision === WILL_COME && answer.withMe > 0? <Label color='green'>{answer.withMe}</Label>: null}
            </List.Content>
            <Image avatar src='https://randomuser.me/api/portraits/men/48.jpg' />
            <List.Content>
                <Header color={answer.id === localStorage.currentUserId? 'green': 'grey'}>{answer.userName}</Header>
                <List.Description>id: {answer.id}</List.Description>
            </List.Content>
        </List.Item>
    )
}


const AnswersList = ({ answers, onItemClick }) => {
    answers = Object.values(answers).filter(a => a.decision !== NO_ANSWER)
    const content = answers.length ?
        answers.map(a => <Answer onClick={onItemClick} key={a.id} answer={a} />) :
        <List.Item>
            <List.Content>
                No answers yet.
            </List.Content>
        </List.Item>
    return (
        <List divided verticalAlign='middle'>
            {content}
        </List>
    )
}


export default AnswersList;
