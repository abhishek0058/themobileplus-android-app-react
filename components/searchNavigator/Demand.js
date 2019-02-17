import React from "react";
import { Text } from 'react-native'
import { View, Form, Item, Input, Label, Button, Spinner, CheckBox  } from "native-base";
import { getFromAsync } from "../AsyncService";
import { postData } from "../FetchService";
export default class Demand extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            qty: '',
            note: '',
            errorMsg: '',
            loading: false,
            successMsg: '',
            toOffice: (props.receiver_store_id == 0 ? true : false)
        }
    }

    async componentWillMount() {
        console.log('props', this.props);
        try {
            console.log("componentDidMount");
            const store = await getFromAsync("store");
            if(!store)
                this.setState({ errorMsg: 'Something is wrong' })
            else
                this.setState({ current_store_id: store.id })
            
        } catch(e) {
            console.log('error in demand', e);
            this.setState({ errorMsg: 'Something is wrong' })
        }
    }

    render() {
        const { loading, errorMsg, successMsg, qty, note } = this.state;
        return (
            <View style={{ padding: 20 }}>
                <Form>
                    <Item>
                        <Label style={{ fontWeight: "bold" }}>Quantity</Label>
                        <Input
                            keyboardType="numeric"
                            onChangeText={qty => this.setState({ qty })}
                            value={qty}
                        />
                    </Item>
                    <Item>
                        <Label style={{ fontSize: 12 }}>Note *(optional)</Label>
                        <Input
                            onChangeText={note => this.setState({ note })}
                            value={note}
                        />
                    </Item>
                    <Item>
                        <CheckBox 
                            checked={this.state.toOffice} 
                            color="red" 
                            onPress={() => {
                                if(this.props.receiver_store_id == 0) {
                                    alert('you can only register this demand to office because no other store has this product available')
                                } else {
                                    this.setState({ toOffice: !this.state.toOffice });
                                }
                            }}
                            style={{ marginRight: 10 }}
                        />
                        <Text style={{ padding: 10, fontSize: 15 }}>Send this demand to office</Text>
                    </Item>
                </Form>
                <View style={{ flex: 1, flexDirection: 'row', margin: 10 }}>
                    <Button success style={{ padding: 10 }} onPress={this._handleSubmit} disabled={loading}>
                        {
                            loading ?
                            (<Spinner color="red" />) :
                            (<Text style={{ color: 'white', fontSize: 17, textAlign: 'center' }}>Submit</Text>)
                        }
                    </Button>
                    {
                        this.props.closeDemandPanel ?
                        (<Button warning style={{ padding: 10, marginLeft: 50 }} onPress={this.props.closeDemandPanel}>
                        <Text style={{ color: 'white', fontSize: 17, textAlign: 'center' }}>Close</Text>
                    </Button>) : null
                    }
                </View>
                <Text style={{ padding: 10, fontSize: 17, alignSelf: 'center', color: 'red' }}>{errorMsg}</Text>
                <Text style={{ padding: 10, fontSize: 17, alignSelf: 'center', color: 'green' }}>{successMsg}</Text>
            </View>
        )
    }

    _handleSubmit = async () => {
        try {
            this.setState({ loading: true, errorMsg: '', successMsg: '' })

            const { qty, note, current_store_id, toOffice } = this.state;
            const { receiver_store_id, modelid, color } = this.props;

            console.log(isNaN(qty), parseInt(qty))

            if(qty.length == 0 || parseInt(qty) < 1) {
                this.setState({ errorMsg: 'Quantity is not valid' });
            } 
            else if(note.length > 99) {
                this.setState({ errorMsg: 'Note can be 100 character long only' });
            } 
            
            else if(!current_store_id || !modelid || !color) {
                this.setState({ errorMsg: 'Unexpected error occurred. Please try again'})
            } 
            
            else {
                const result = await postData("user/demand", {
                    qty, note, current_store_id, receiver_store_id: (toOffice ? 7 : receiver_store_id), modelid, color
                });
                if(result.result) {
                    this.setState({ successMsg: 'Demand registered'})
                }
                else {
                    this.setState({ errorMsg: result.message });
                }
            }
            this.setState({ loading: false });
        }
        catch(e) {
            console.log('demand submit -> ', e);
            this.setState({ errorMsg: 'server error', loading: false });
        }
    }

}