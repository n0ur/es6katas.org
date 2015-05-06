const pathToLink = (path) => {
  const kata = path.replace(/^katas\//, '').replace(/\.js$/, '');
  const pathParts = kata.split('/').reverse();
  const text = pathParts[0];
  const id = pathParts[1] + "/" + pathParts[0];
  return {
    text: text,
    url: `http://tddbin.com/#?kata=${kata}`,
    id: id
  };
};

export default class KataLink {
  
  static fromPath(path) {
    const link = new KataLink();
    const {text, url, id} = pathToLink(path);
    link.text = text;
    link.url = url;
    link.id = id;
    return link;
  }
  
}
