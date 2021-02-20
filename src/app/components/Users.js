import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import { useHistory } from 'react-router-dom';
import { loadingStates } from '../constants';
import { getUsers, selectUsersIds, selectUsersStatus } from '../slices/users';

const ItemLoader = () => (
  <div>
    <span>Loading...</span>
  </div>
);

const Users = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectUsersStatus);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const users = useSelector(selectUsersIds);

  const loadMore = (page) => {
    if (status !== loadingStates.PENDING) {
      dispatch(getUsers({ page, since: users[users.length - 1] }));
    }
  };

  const history = useHistory();
  const handleClick = useMemo(() => users.map(user => {
    return history.push(user.login);
  }), [users, history]);

  const renderedUsersList = useMemo(() => users.map((user, id) => (
    <ul>
      <li key={id} onClick={handleClick}>
        <img scr={user.avatar_url} alt='avatar' />
        <h3>{user.login}</h3>
        <span>{user.login}</span>
      </li>
    </ul>
  )), [users, handleClick])

  return (
    <div>
      <InfiniteScroll
        pageStart={1}
        hasMore
        loader={<ItemLoader key="loader" />}
        loadMore={loadMore}
      >
        {renderedUsersList}
      </InfiniteScroll>

    </div>
  );
};

export default Users;
