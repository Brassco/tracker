import React from 'react';
import {View, Text} from 'react-native';
import styles from "../styles";

class UserRow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showDeleteButton: false
        }
    }

    render() {
        console.log('this.props.name', this.props.name, this.props.name.length)
        return (
            <View style={{
                flexDirection: 'row'
            }}>
                <View
                    style={{
                        marginVertical: 10,
                        paddingLeft: 10,
                        height: 50,
                        width: '90%',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                    }}
                >
                    <Text style={styles.emailText}>
                        {
                            this.props.email
                        }
                    </Text>
                    <View style={{ flexDirection: 'row'}}>
                        <Text style={styles.nameText}>
                            {
                                this.props.name
                            }
                        </Text>
                        {
                            this.props.isOwner &&
                            <Text style={styles.isOwnerText}>
                                (owner)
                            </Text>
                        }
                    </View>
                </View>
            </View>
        )
    }
}

export default UserRow;