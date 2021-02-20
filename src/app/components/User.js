import { loadingStates } from '../constants';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import {
  Breadcrumb,
  Card, Container, Divider, Grid, Icon, Image, Segment,
} from 'semantic-ui-react';
import UserPlaceholder from './UserPlaceholder';
import {
  getUser, removeUser, selectCurrentUser, selectUserStatus,
} from '../slices/user';

const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString();

const User = () => {
  const { username } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser(username));
    return () => dispatch(removeUser());
  }, [username, dispatch]);

  const user = useSelector((state) => selectCurrentUser(state, username));
  const status = useSelector(selectUserStatus);

  const {
    name,
    avatar_url: avatarUrl,
    followers,
    following,
    created_at: createAt,
    company,
    email,
    location,
    blog,
    bio,
  } = user;

  const isUserLoading = status === loadingStates.IDLE || status === loadingStates.LOADING;

  if (isUserLoading) {
    return <UserPlaceholder />;
  }

  return (
    <Container>
      <Segment>
        <Breadcrumb>
          <Breadcrumb.Section link as={NavLink} to="/">Home</Breadcrumb.Section>
          <Breadcrumb.Divider icon="right chevron" />
          <Breadcrumb.Section active>{username}</Breadcrumb.Section>
        </Breadcrumb>
      </Segment>

      <Grid>
        <Grid.Column tablet="6" mobile="16" computer="6">
          <Image centered src={avatarUrl} />
        </Grid.Column>
        <Grid.Column mobile="16" tablet="10" computer="10">
          <Card fluid>
            <Card.Content>
              <Card.Header>{name}</Card.Header>
              <Card.Meta>
                Created at:
                {' '}
                {formatDate(createAt)}
                {email}
              </Card.Meta>
              <Card.Meta />
              <Card.Description>
                {bio}
                <p>
                  {company}
                </p>
                <Divider />
                <Grid columns="2">
                  <Grid.Row>
                    <Grid.Column>
                      Followers:
                      {' '}
                      <strong>{followers}</strong>
                    </Grid.Column>
                    <Grid.Column>
                      Following:
                      {' '}
                      <strong>{following}</strong>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
                <Divider />
                {blog && <a href={blog} target="_blank" rel="noreferrer">{blog}</a>}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Icon name="map marker alternate" />
              {' '}
              {location}
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default User;
