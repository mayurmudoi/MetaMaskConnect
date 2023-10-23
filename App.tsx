import { StyleSheet, Text, View, Pressable, TouchableOpacity } from 'react-native';
import {WalletConnectModal,useWalletConnectModal} from '@walletconnect/modal-react-native';

const projectId = 'YOUR_WALLET_CONNECT_PROJECT_ID';

const providerMetadata = {
	name: 'YOUR_PROJECT_NAME',
	description: 'YOUR_PROJECT_DESCRIPTION',
	url: 'https://your-project-website.com/',
	icons: ['https://your-project-logo.com/'],
	redirect: {
		native: 'YOUR_APP_SCHEME://',
		universal: 'YOUR_APP_UNIVERSAL_LINK.com',
	},
};

export default function App() {

	const { open, isConnected, address, provider } = useWalletConnectModal();
  const handleButtonPress = async () => {
		if (isConnected) {
			return provider?.disconnect();
		}
		return open();
	};

	return (
		<View style={styles.container}>
			<Text style={styles.heading}>Wallet Connect</Text>
			<Text style={styles.connection}>{isConnected ? address : 'Not Connected'}</Text>

      <TouchableOpacity style={[styles.button, styles.connection]} onPress={handleButtonPress}>
        <Text style={styles.buttonText}>{isConnected ? 'Disconnect' : 'CONNECT'}</Text>
      </TouchableOpacity>

			<WalletConnectModal
				explorerRecommendedWalletIds={[
					'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96',
				]}
				explorerExcludedWalletIds={'ALL'}
				projectId={projectId}
				providerMetadata={providerMetadata}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	heading: {
		fontSize: 30,
    letterSpacing:2,
    marginBottom: 16,
    fontWeight:'300'
	},
  connection:{
    padding:10,
    fontSize:18,
    borderRadius:10,
  },
	button: {
    width:150,
    marginTop: 16,
    alignItems:'center',
    backgroundColor:'#cab287',
	},
  buttonText:{
    fontSize:20,
    letterSpacing:2,
    fontWeight:'500',
  }
});