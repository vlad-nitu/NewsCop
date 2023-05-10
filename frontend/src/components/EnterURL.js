import { Container, Form, Button } from "react-bootstrap";

export default function EnterURL() {
  return (
    <Container className="my-3">
      <div className="mt-5">
        <h2 className="text-center" style={{ fontSize: '1.5vh' }}>
          Enter the article's URL to check for plagiarism
        </h2>
      </div>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <Form.Group controlId="formUrl" className="rounded p-5 border border-success border-2 rounded-3">
          <Form.Control type="url" placeholder="Enter URL" />
        </Form.Group>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="primary" type="submit" className="mt-4 mx-auto rounded-pill" style={{ width: '50%' }}>
            Submit
          </Button>
        </div>
      </div>
    </Container>
  );
}
