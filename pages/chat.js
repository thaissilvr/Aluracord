import appConfig from '../config.json';
import { Box, Image } from '@skynexui/components';


export default function PaginadoChat() {
    return (
        <>

            <Box
                styleSheet={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: appConfig.theme.colors.primary[500],
                    backgroundImage: 'url(https://cdn.wallpapersafari.com/29/67/4mL0ap.jpg)',
                    backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                }}

            >
                <h2>Essa é a página do chat! 👩‍💻</h2>
                <Image src='https://blog.explicae.com.br/wp-content/uploads/2017/10/giphy-2.gif' />

            </Box>
        </>
    )
}