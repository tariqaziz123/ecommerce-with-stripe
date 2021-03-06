import { Component } from 'react';
import AppNavbar from './AppNavbar';
import {Card, CardText, CardBody, CardTitle, CardSubtitle, Button, Container, Alert} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getItems } from '../actions/itemActions';
import { addToCart } from '../actions/cartActions';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import './styles/Home.css'; 

class Home extends Component {

    componentDidMount(){
        this.props.getItems();
    }

    static propTypes = {
        getItems: PropTypes.func.isRequired,
        item: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool,
        addToCart: PropTypes.func.isRequired,
        user: PropTypes.object.isRequired
    }

    onAddToCart = async (id, productId) => {
        await this.props.addToCart(id, productId, 1);
        alert ('Item added to Cart');
    }

    render(){
        const { items } = this.props.item;
        const user = this.props.user;
        return (
            <div>
            <AppNavbar/>
            <Container>
                <div className="row">
                {items.length ? items.map((item)=>(
                    <div className="col-md-4">
                    <Card className="mb-4">
                        <CardBody>
                            <Carousel showArrows={true} className="product__image">
                            {item.image.map((pictures) =>(
                                <img src={pictures} width='70px' alt={item.title} />
                            ))}
                            </Carousel>
                            <CardTitle tag="h5">{item.title}</CardTitle>
                            <CardText>{item.description}</CardText>
                            <CardSubtitle tag="h6">Rs. {item.price}</CardSubtitle>
                            <CardText>{item.category}</CardText>
                            {this.props.isAuthenticated ? 
                                <Button
                                    color="success"
                                    size="sm"
                                    onClick={this.onAddToCart.bind(this, user._id, item._id)}
                                    >Add To Cart</Button> :
                                    null}
                        </CardBody>
                    </Card>
                    </div>
                )): <div style={{width:"100%"}}><Alert className="text-center">No products found. </Alert></div>}
                 </div>
            </Container>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
})

export default connect(mapStateToProps, {getItems, addToCart})(Home);