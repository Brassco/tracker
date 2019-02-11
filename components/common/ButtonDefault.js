import React from 'react';
import {Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import {Colors, Fonts, DefaultStyles} from '../../constants';

const ButtonDefault = (props) => {
    return (
        <TouchableOpacity
            style={[
                DefaultStyles.button,
                {
                    width: '100%'
                }
            ]}
            onPress={props.onPress}
        >
            {!!props.fetching ? (
                <ActivityIndicator size="large" color={Colors.white} />
            ) : (
                <Text style={DefaultStyles.buttonWhiteText}>
                    {
                        props.children
                    }
                </Text>
            )}
        </TouchableOpacity>
    )
}

export {ButtonDefault};