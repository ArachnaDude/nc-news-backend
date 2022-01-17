exports.formatUsers = (data) => {
  return data.map((user) => {
    return [user.username, user.avatar_url, user.name];
  });
};
