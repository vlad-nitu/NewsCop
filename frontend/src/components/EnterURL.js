import { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

export default function EnterURL() {
  const PreInputArticlePrompt = "Article's URL";
  const buttonStyle = {
    width: '50%',
    height: '8vh',
    fontWeight: 'bold',
    fontSize: 'calc(1vh + 1vw)', // Adjust the font size as needed
    backgroundColor: '#2E837E',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '25%',
    marginRight: '25%',
  };

  const [inputValue, setInputValue] = useState('');
  const [showInputValue, setShowInputValue] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowInputValue(true);
    setButtonDisabled(true);
    setTimeout(() => {
      setShowInputValue(false);
      setButtonDisabled(false);
    }, 5000);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    console.log(event.target.value);
  };

  return (
    <Container className='my-3'>
      <div className='mt-5'>
        <h2 className='text-center' style={{ fontSize: '1.5vh' }}>
          Enter the article's URL to check for plagiarism
        </h2>
      </div>
      <div style={{ maxWidth: '60vh', margin: '0 auto' }}>
        <Form.Group controlId='formUrl'>
          <Form.Control
            type='url'
            placeholder={PreInputArticlePrompt}
            className='rounded-pill border-success'
            style={{ height: '50px' }}
            value={inputValue}
            onChange={handleInputChange}
            disabled={buttonDisabled}
          />
        </Form.Group>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant='primary'
            type='submit'
            className='mt-4 rounded'
            style={buttonStyle}
            onClick={handleSubmit}
            disabled={buttonDisabled || !inputValue}
          >
            Submit
          </Button>
        </div>
        {showInputValue && <div>Input value: "{inputValue}"</div>}
      </div>
    </Container>
  );
}
