exports.formatComments = (data) => {
  return data.map((comment) => {
    return [
      comment.author,
      comment.article_id,
      comment.votes,
      comment.created_at,
      comment.body,
    ];
  });
};
