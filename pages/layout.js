import { Navbar, Button, Link, Text } from "@nextui-org/react";
import { Box } from "./box.js";
import { useRouter } from "next/router";

export function Layout({ children }) {
// export const Layout = ({ children }) => (
    const router = useRouter();
    return (
        <Box
            css={{
            maxW: "100%"
            }}
        >
            <Navbar isCompact isBordered variant="sticky">
                <Navbar.Brand>
                <Text b color="inherit" hideIn="xs">
                    NEXT
                </Text>
                </Navbar.Brand>
                <Navbar.Content hideIn="xs" variant="underline">
                    <Navbar.Link href="/"  {...(router.pathname == "/" && { isActive: true })}>Summary Data</Navbar.Link>
                    <Navbar.Link href="/raw"  {...(router.pathname == "/raw" && { isActive: true })}>Raw Data</Navbar.Link>
                </Navbar.Content>
                <Navbar.Content>
                </Navbar.Content>
            </Navbar>

            {children}
        </Box>
    );
}
