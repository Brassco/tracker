import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';

const ButtonCopy = (props) => {
    return(
        <TouchableOpacity
            onPress={props.onPress}
            style={[
                {
                    backgroundColor: '#00cfd7',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 20,
                    width: 30,
                    height: 30,
                },
                props.style
            ]}>
            <Image
                style={{
                    width: 15,
                    height: 15,
                }}
                resizeMode={'contain'}
                source={require('../../assets/images/xxxhdpi/btn_copy.png')}
            />
        </TouchableOpacity>
    )
}

export {ButtonCopy}