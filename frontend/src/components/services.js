import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

export default function Services({ titles, descriptions, images }) {
    if (titles.length != descriptions.length ||
        titles.length != images.length || 
        descriptions.length != images.length) {
            throw Error("Different lengths of the arrays.")
        }

    const imageStyle = {
        width: '100%',
        height: 'auto'
    };

    const textStyle = {
        color: 'white',
        fontWeight: 'bolder'
    }

    const textStyleParagraph = {
        color: 'white'
    }

    const cards = []
    for (let i = 0; i < 3; i++) {
        cards.push(
            <Col md={4} className="px-4 py-sm-4">
                <img style={imageStyle} src={images[i]} alt="Service 1" className="pb-3" />
                <h3 style={textStyle}>{titles[i]}</h3>
                <p style={textStyleParagraph}>{descriptions[i]}</p>
            </Col>
        )
    }
    
    return (
        <div id="services" style={{ backgroundColor: "#2E837E" }}>
            <Container className="py-5">
                <h2 className="title">Services</h2>
                <Row className="pt-3">
                    <Col md={4} className="pe-sm-4 mb-4 mb-sm-0">
                        <img style={imageStyle} src={images[0]} alt="Service 1" className="pb-3" />
                        <h3 style={textStyle}>{titles[0]}</h3>
                        <p style={textStyleParagraph}>{descriptions[0]}</p>
                        <button type="button" className="btn btn-outline-warning">Try it</button>
                    </Col>
                    <Col md={4} className="pe-sm-4 mb-4 mb-sm-0">
                        <img style={imageStyle} src={images[1]} alt="Service 2" className="pb-3" />
                        <h3 style={textStyle}>{titles[1]}</h3>
                        <p style={textStyleParagraph}>{descriptions[1]}</p>
                        <button type="button" className="btn btn-outline-warning">Try it</button>
                    </Col>
                    <Col md={4} className="pe-sm-4">
                        <img style={imageStyle} src={images[2]} alt="Service 3" className="pb-3" />
                        <h3 style={textStyle}>{titles[2]}</h3>
                        <p style={textStyleParagraph}>{descriptions[2]}</p>
                        <button type="button" className="btn btn-outline-warning">Try it</button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}