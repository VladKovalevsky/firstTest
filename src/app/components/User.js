import { loadingStates } from '../constants';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
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

  const isUserLoading = status === loadingStates.PENDING || status === loadingStates.LOADING;

  if (isUserLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <img src={avatarUrl} alt='avatar' />
      </div>
      <div>
        <div>
          <div>
            <h3>{name}</h3>
            <div>
              Created at:
              {' '}
              {formatDate(createAt)}
              {email}
            </div>
            <div>
              {bio}
              <p>
                {company}
              </p>
              <div>
                <div>
                  <div>
                    Followers:
                    {' '}
                    <strong>{followers}</strong>
                  </div>
                  <div>
                    Following:
                    {' '}
                    <strong>{following}</strong>
                  </div>
                </div>
              </div>
              {blog && <a href={blog} target="_blank" rel="noreferrer">{blog}</a>}
            </div>
          </div>
          <div>
            {' '}
            {location}
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
