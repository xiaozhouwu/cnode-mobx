import React from 'react';
import PropTypes from 'prop-types'; // eslint-disable-line
import {
  inject,
  observer,
} from 'mobx-react';

import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

import UserWrapper from './user';
import infoStyles from './styles/user-info-style';

const TopicItem = ({ topic, onClick }) => (
  <ListItem button onClick={onClick}>
    <Avatar src={topic.author.avatar_url} />
    <ListItemText
      primary={topic.title}
      secondary={`最新回复：${topic.last_reply_at}`}
    />
  </ListItem>
);

TopicItem.propTypes = {
  topic: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

@inject(stores => ({
  appStore: stores.appStore,
  user: stores.appStore.user,
}))
@observer
class UserInfo extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
  }

  componentDidMount = () => {
    this.props.appStore.getUserDetail();
    this.props.appStore.getUserCollection();
  }

  goToTopic = (id) => {
    this.context.router.history.push(`/detail/${id}`);
  }

  render() {
    const { classes } = this.props;
    const {
      recent_topics: topics,
      recent_replies: replies,
    } = this.props.user.detail;
    const {
      list: collections,
    } = this.props.user.collections;
    return (
      <UserWrapper>
        <div className={classes.root}>
          <Grid container spacing={16} align="stretch">
            <Grid item xs={12} md={4}>
              <Paper elevation={2}>
                <Typography className={classes.partTitle}>
                  <span>最近发布的话题</span>
                </Typography>
                <List>
                  {
                    topics.length > 0 ?
                      topics.map(topic => (
                        <TopicItem
                          key={topic.id}
                          topic={topic}
                          onClick={() => this.goToTopic(topic.id)}
                        />
                      )) :
                      <Typography align="center">
                        最近没有发布过话题
                      </Typography>
                  }
                </List>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={2}>
                <Typography className={classes.partTitle}>
                  <span>新的回复</span>
                </Typography>
                <List>
                  {
                    replies.length > 0 ?
                      replies.map(topic => (
                        <TopicItem
                          key={topic.id}
                          topic={topic}
                          onClick={() => this.goToTopic(topic.id)}
                        />
                      )) :
                      <Typography align="center">
                        最近没有新的回复
                      </Typography>
                  }
                </List>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={2}>
                <Typography className={classes.partTitle}>
                  <span>收藏的话题</span>
                </Typography>
                <List>
                  {
                    collections.length > 0 ?
                      collections.map(topic => (
                        <TopicItem
                          key={topic.id}
                          topic={topic}
                          onClick={() => this.goToTopic(topic.id)}
                        />
                      )) :
                      <Typography align="center">
                        还没有收藏的话题哦
                      </Typography>
                  }
                </List>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </UserWrapper>
    );
  }
}

UserInfo.wrappedComponent.propTypes = {
  appStore: PropTypes.object.isRequired,
};

export default withStyles(infoStyles)(UserInfo);
