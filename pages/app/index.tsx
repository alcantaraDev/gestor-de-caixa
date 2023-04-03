import {Poppins} from "next/font/google"

import { PageLayout } from "@/components/pageLayote"
import { TitleBar } from "@/components/titleBar"
import { useAuth } from "@/contexts/auth"

const poppins = Poppins({
    weight: ["100","200", '300', "400", "500", "600", "700", "800", "900"],
    subsets: ["latin"]
}) 

export default function Page() {
    const {user, signOut} = useAuth()
    
    return (
        <div style={poppins.style}>
            <PageLayout>
                <TitleBar title="caixa"/>
            </PageLayout>
        </div>
    )
}