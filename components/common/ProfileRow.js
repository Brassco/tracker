import React from 'react';
import {View, Text, Image} from 'react-native';
import {ButtonCopy} from '../common';
import {Colors, Fonts} from '../../constants'

const ProfileRow = (props) => {
    let {imageSrc, children} = props;
    let {container, title, imageStyle, titleWrapper, imageWrapper, buttonWrapper} = styles;
    return (
        <View style={container}>
            <View
                style={imageWrapper}
            >
                <Image
                    resizeMode={'contain'}
                    style={imageStyle}
                    source={imageSrc}
                />
            </View>
            <View style={titleWrapper}>
                <Text style={title}>
                    {
                        children
                    }
                </Text>
            </View>
            <View style={buttonWrapper}>
                {
                    props.onCopy &&
                        <ButtonCopy style={props.buttonStyle} onPress={props.onCopy}/>
                }
            </View>
        </View>
    )
}

const styles = {
    container: {
        flexDirection: 'row',
        marginHorizontal: 10,
        justifyContent: 'flex-start',
        alignItems: 'center',
        alignSelf: 'stretch'
    },
    title: {
        color: Colors.fontMain,
        fontFamily: Fonts.FuturaBook,
        fontSize: 16
    },
    imageWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '10%',
        margin: 5,
        marginRight: 15,
    },
    titleWrapper: {
        flex: 1
    },
    buttonWrapper: {
        width: '15%',
    },
    imageStyle: {
        width: 20,
        height: 20,
    }
}

export {ProfileRow}