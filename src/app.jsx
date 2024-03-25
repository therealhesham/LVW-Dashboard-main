import React from 'react';
import ReactDOM from 'react-dom';
import 'assets/css/App.css';

import { HashRouter, Route, Switch, Redirect,BrowserRouter} from 'react-router-dom';

import AuthLayout from 'layouts/auth';
import AdminLayout from 'layouts/admin';
import RtlLayout from 'layouts/rtl';
import { ChakraProvider } from '@chakra-ui/react';
import theme from 'theme/theme';
import { ThemeEditorProvider } from '@hypertheme-editor/chakra-ui';
import { CSSReset } from "@chakra-ui/react";
import { Router } from 'react-router-dom/cjs/react-router-dom';
import { Routes } from 'react-router';


function App(){

return(



    <ChakraProvider theme={theme}>
		<CSSReset />
			<ThemeEditorProvider>
				<BrowserRouter>
		<Route path={`/auth`} component={AuthLayout} />
						<Route path={`/admin`} component={AdminLayout} />
						<Route path={`/rtl`} component={RtlLayout} />
			
				</BrowserRouter>
			</ThemeEditorProvider>
	</ChakraProvider>
)



}

export default App;