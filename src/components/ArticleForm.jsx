import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import ArticleList from './ArticleList';

const defaultArticleData = {
    title: '',
    image: '',
    content: '',
    category: '',
    tags: {},
    published: false,
};

const tagOptions = ['Tag 1', 'Tag 2', 'Tag 3'];
const categoryOptions = ['Categoria 1', 'Categoria 2', 'Categoria 3'];

function ArticleForm() {
    const [articles, setArticles] = useState([]);
    const [articleData, setArticleData] = useState(defaultArticleData);
    const [fileInput, setFileInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setArticles([...articles, articleData]);
        setArticleData(defaultArticleData);
        setFileInput('');
    };

    const removeArticle = (indexToDelete) => {
        setArticles(array => array.filter((_, i) => i !== indexToDelete));
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            if (name === 'published') {
                setArticleData({
                    ...articleData,
                    [name]: checked,
                });
            } else {
                setArticleData({
                    ...articleData,
                    tags: {
                        ...articleData.tags,
                        [name]: checked,
                    },
                });
            }
        } else if (type === 'file') {           
            const file = e.target.files[0];
            setArticleData({
                ...articleData,
                [name]: URL.createObjectURL(file), 
            });
            setFileInput(file.name);
        } else {
            setArticleData({
                ...articleData,
                [name]: value,
            });
        }
    };

    return (
        <>
            <Form onSubmit={handleSubmit}>

                {/* Titolo */}
                <FormGroup>
                    <Label for="title">Titolo</Label>
                    <Input
                        id="title"
                        name="title"
                        placeholder="Titolo"
                        type="text"
                        value={articleData.title}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>

                {/* Immagine */}
                <FormGroup>
                    <Label for="image">Immagine</Label>
                    <Input
                        id="image"
                        name="image"
                        type="file"
                        onChange={handleChange}
                    />                    
                </FormGroup>

                {/* Descrizione */}
                <FormGroup>
                    <Label for="content">Descrizione</Label>
                    <Input
                        id="content"
                        name="content"
                        placeholder="Contenuto"
                        type="textarea"
                        value={articleData.content}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>

                {/* Categoria */}
                <FormGroup>
                    <Label for="category">Categoria</Label>
                    <Input
                        id="category"
                        name="category"
                        type="select"
                        value={articleData.category}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Seleziona una categoria</option>
                        {categoryOptions.map((category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>
                        ))}
                    </Input>
                </FormGroup>

                {/* Tag */}
                <FormGroup tag="fieldset">
                    <Label>Tag</Label>
                    {tagOptions.map((tag, index) => (
                        <FormGroup check key={index}>
                            <Label check>
                                <Input
                                    type="checkbox"
                                    name={tag}
                                    checked={articleData.tags[tag] || false}
                                    onChange={handleChange}
                                />
                                {tag}
                            </Label>
                        </FormGroup>
                    ))}
                </FormGroup>

                {/* Pubblicato */}
                <FormGroup switch>
                    <Input
                        type="switch"
                        name="published"
                        checked={articleData.published}
                        onChange={handleChange}
                    />
                    <Label check>Pubblica</Label>
                </FormGroup>
                <Button type="submit" color="success">Aggiungi Articolo</Button>
            </Form>
            
            <ArticleList articles={articles} removeArticle={removeArticle} />
        </>
    );
}

export default ArticleForm;
