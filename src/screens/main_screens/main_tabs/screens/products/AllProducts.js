import React, { Component } from 'react';
import {
	View,
	StyleSheet,
	ScrollView,
    RefreshControl,
    Text
} from 'react-native';
import axios from 'axios';
import { API_URL } from 'react-native-dotenv'
import ProductCard from '../../components/ProductCard'

class AllProducts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: [''],
            refreshing: true,
        }
    }
    componentWillMount(){
        this.loadProducts();
    }
    loadProducts(){
        var all_products_path = `${API_URL}/products/all_products/`;
        var self = this;
        axios.get(all_products_path)
        .then (function (response) {
            self.setState({ refreshing: false });
            console.log('response.data', response.data);
            console.log('response.status', response.status);
            if(response.status>= 200 && response.status<300){
                self.setState({ products: response.data });
            }
        })
        .catch(function (error) {
            console.log('error', error);
            self.setState({ refreshing: false });
            alert(error);
        })
    }
    refreshProducts = async () => {
		this.setState({ refreshing: true });
		this.loadProducts();
	}
    render() {
        if(this.state.products.length>0)
            return (
                <View style={styles.container}>
                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this.refreshProducts}
                            />
                        }
                    >
                        {this.state.products.map((product, index) => {
                            vendor_name = product.vendor ? product.vendor.name:undefined;
                            vendor_photo = product.vendor ? product.vendor.photo:undefined;
                            return (
                                <ProductCard
                                    key={index}
                                    onPressVendorPhoto={() => {this.props.navigation.navigate('ProfileDetails', {user:product.vendor, title: vendor_name})}}
                                    onPressCard={() => {this.props.navigation.navigate('ProductDetails', {product:product, title: product.name})}}
                                    productName={product.name}
                                    vendorName={vendor_name}
                                    vendorPhoto={vendor_photo}
                                    productPhoto={product.photo}
                                    productPrice={product.price}
                                />
                            );
                        })}
                    </ScrollView>
                </View>
            );
        else 
            return (
                <View style={styles.container}>
                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this.refreshProducts}
                            />
                        }
                    >
                    <Text style={styles.text}> Não foram encontrados produtos proximos a você :( </Text>
                    <Text style={styles.text}> Deslise para baixo para atualizar </Text>
                    </ScrollView>
                </View>
            );
	}

}
export default AllProducts;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
    text:{
        textAlign: 'center',
        fontSize: 20,
    }
});