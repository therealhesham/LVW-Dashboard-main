import React from 'react';
import ReactDOM from 'react-dom';
import 'assets/css/App.css';
import { HashRouter, Route, Routes} from 'react-router-dom';
import AuthLayout from 'layouts/auth';
import AdminLayout from 'layouts/admin';
import RtlLayout from 'layouts/rtl';
import { ChakraProvider } from '@chakra-ui/react';
import theme from 'theme/theme';
import { ThemeEditorProvider } from '@hypertheme-editor/chakra-ui';
import { CSSReset } from "@chakra-ui/react";
import App from 'app';
ReactDOM.render(
	
    <ChakraProvider theme={theme}>
		<CSSReset />
			<ThemeEditorProvider>
				<BrowserRouter>
				<Routes>
		<Route exact path={`/auth`} element={AuthLayout} />

		<Route path={`/auth`} element={AuthLayout} />
						<Route path={`/admin`} element={AdminLayout} />
						<Route path={`/rtl`} element={RtlLayout} />
						</Routes>	
				</BrowserRouter>
			</ThemeEditorProvider>
	</ChakraProvider>
,
	document.getElementById('root')
);
