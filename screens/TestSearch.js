import React from 'react';
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { Searchbar } from 'react-native-paper';
import SearchList from '../Components/SearchList';
import SearchResult from '../Components/SearchResult';
import TestOverview from '../Components/TestOverview';
import RemoveTest from '../Components/RemoveTest';
import SearchMenuView from '../Components/SearchMenuView';
import api from '../Helper/api';
// import * as SecureStore from 'expo-secure-store';
import store from '../reduxhelper/store';
import CartStatus from '../Components/CartStatus';
import PackageOverview from '../screens/PackageOverview';
import  AsyncStorage  from '@react-native-community/async-storage';

const Global = require('../Helper/Constants')


class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            testinfo: [],
            searchQuery: '',
            updateResultView: false,
            searchMenuType: Global.labtest,
            updateOverview: false
        }
        // this.unsubscribeStore = store.subscribe(this.getStoreInfo);
        this.getLabTest()
    }

    componentDidMount() {
        this.focusListener = this.props.navigation.addListener('focus', () => {
            console.log('above subscribe')
            console.log(store.getState())
            if(store.getState().testInfo.length > 0)
                this.setState({updateResultView: true})
        })
        
        
    }

    getStoreInfo = () => {
        console.log('inside store')
        store.getState()
    }

    getLabTest = async () => {
        try{
            // await AsyncStorage.getItem('auth_token')
            // .then((token) => {
                // console.log(token)
                api.getData(this.state.searchQuery === '' ? 'testsInfo/tests/' : 'lab/test/?name=' + this.state.searchQuery, '')
                    .then(([statuCode, data]) => {
                        console.log(data);
                        if (statuCode === 200) {
                            this.setState({ testinfo: data })
                        }
                    })
            // })
        }catch(e){

        }
    }

    getPackage = async () => {
        try{
            await AsyncStorage.getItem('auth_token')
            .then((token) => {
                console.log(token)
                api.getData(this.state.searchQuery === '' ? 'package/pkg/' : 'package/pkg/?name=' + this.state.searchQuery, '')
                    .then(([statuCode, data]) => {
                        console.log(data);
                        if (statuCode === 200) {
                            this.setState({ testinfo: data })
                        }
                    })
            })
        }catch(e){

        }
        
    }

    getTestData = () => {
        switch(this.state.searchMenuType){
            case Global.labtest:
                this.getLabTest()
                break
            case Global.package:
                this.getPackage()
                break
            default:
                console.log('medical center')
        }
    }

    onChangeSearchMenu = menuType => {
        this.setState({searchMenuType: menuType, searchQuery: ''}, () => this.getTestData())
        
    }

    onChangeSearch = query => {
        this.setState({ searchQuery: query }, () => this.getTestData())
    }

    callCart = () => {
        this.props.navigation.navigate('SlotSelectScreen');
    }

    onClickOverview = item => {
        console.log(item)
        this.state.searchMenuType == Global.labtest ? this.setState({updateOverview: true, overviewItem: item}) : this.callPackageOverview(item)
    }

    callPackageOverview = item => {
        this.props.navigation.navigate('PackageOverview', {
            itemInfo: item
        });
    }

    removeOverview = () => {
        this.setState({updateOverview: false})
    }

    render() {
        let cartStatus;
        if(this.state.updateResultView){
            cartStatus = <CartStatus updateView={this.state.updateResultView} onCallCart={this.callCart}/>
        }
        let overviewView;
        if(this.state.updateOverview){
            overviewView = <TestOverview data={this.state.overviewItem} onClickRemoveView={this.removeOverview}/>
        }
        return (
            <View style={stylesheet.container}>
                <View style={stylesheet.header}>
                    {/* <View style={stylesheet.navBar}>
                         <View style={stylesheet.backArrowView}><Image source={require('../Images/back.png')} /></View> 
                        <View style={stylesheet.navTitle}>
                            <Text style={stylesheet.title}>{this.state.title}</Text>
                        </View>
                    </View> */}
                    <View style={stylesheet.searchView}>
                        <Searchbar placeholder="Search" onChangeText={this.onChangeSearch} value={this.state.searchQuery} autoCorrect={false} />
                    </View>
                </View>
                <View style={stylesheet.searchMenu}>
                    <SearchMenuView onChangeMenu={this.onChangeSearchMenu}/>
                </View>
                <View style={stylesheet.footer}>
                    <SearchResult data={this.state.testinfo} navigateRef={this.props.navigation} updateView={this.state.updateResultView} testType={this.state.searchMenuType} onClickOverview={this.onClickOverview} />
                </View>
                {cartStatus}
                {overviewView}
            </View>
        );
    }
}


export default Search;

const stylesheet = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        flex: 2,
    },
    footer: {
        flex: 6,
    },
    backArrowView: {
        flex: 1,
        marginLeft: 20,
        marginTop: 5
    },
    navBar: {
        height: 40,
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'center'
    },
    navTitle: {
        flex: 6,
        justifyContent: 'center'
    },
    title: {
        color: '#2f363f',
        fontSize: 20
    },
    searchView: {
        marginHorizontal: 20,
        marginTop: 20
    },
    overlayStyle: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red'
    },
    searchMenu: {
        marginHorizontal: 20
    }
});