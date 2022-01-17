exports.formatTopics = (data) => {
  return data.map((topic) => {
    return [topic.slug, topic.description];
  });
};
