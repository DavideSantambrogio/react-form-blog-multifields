
import React from 'react';
import { Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';

function ArticleList({ articles, removeArticle }) {
    return (
        <div className='mt-5'>
            {articles.map((article, index) => (
                <Card key={`article${index}`} className="mb-3">
                    <CardBody>
                        <CardTitle tag="h5">{article.title}</CardTitle>

                        {/* Immagine */}
                        <img src={article.image} alt="article" className='img-fluid mb-3' />

                        <CardText>
                            <strong>Contenuto:</strong> {article.content}<br />
                            <strong>Categoria:</strong> {article.category}<br />
                            <strong>Tag:</strong> {Object.keys(article.tags).filter(tag => article.tags[tag]).join(', ')}<br />
                            <strong>Pubblicato:</strong> {article.published ? 'Sì' : 'No'}
                        </CardText>

                        
                        <Button color="danger" onClick={() => removeArticle(index)}>Rimuovi</Button>
                    </CardBody>
                </Card>
            ))}
        </div>
    );
}

export default ArticleList;
