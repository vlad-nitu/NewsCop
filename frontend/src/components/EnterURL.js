import { Container, Form, Button } from "react-bootstrap";

export default function EnterURL() {
  return (
    <Container className="my-3">
      <div className="mt-5">
        <h2 className="text-center" style={{ fontSize: '1.5vh' }}>
          Enter the article's URL to check for plagiarism
        </h2>
      </div>
      <div>
        <Form.Group controlId="formUrl">
          <Form.Control type="url" placeholder="Enter URL" />
        </Form.Group>
      </div>
      <div className="d-grid">
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </div>
    </Container>
  );
}
