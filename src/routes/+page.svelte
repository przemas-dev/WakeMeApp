<script lang="ts">
	import { enhance } from "$app/forms";
import { Button, Col, Container, Form, FormGroup, Input, Row } from "@sveltestrap/sveltestrap";

</script>
<Container>
    <Row>
        <Col lg="4">
            <form method="post" action="?/add" use:enhance={()=>{
             return async ({result})=>{
                console.log('Form submitted, server response:', result);
             };
            }}>
                <FormGroup floating label="https://example.com">
                    <Input type="url" name="url" required/>
                </FormGroup>

                <FormGroup floating label="Frequency">
                    <Input type="select" name="frequency" required>
                        <option value="1">af</option>
                        <option value="2">agfa</option>
                    </Input>
                </FormGroup>

                <Button type="submit">Pls wake my app</Button>
            </form>
        </Col>
    </Row>

</Container>