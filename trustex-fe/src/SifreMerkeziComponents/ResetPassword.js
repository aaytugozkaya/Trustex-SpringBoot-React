import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button, Grid, TextField, Container, Paper, Typography } from "@mui/material";
import axios from "axios";

function ResetPassword() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [errorMessages, setErrorMessages] = useState([]);

    const handleResetPassword = async () => {
        try {
            const response = await axios.put('auth/reset-password',
                { password: newPassword, confirmPassword: confirmPassword },
                {
                    params: { token },
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            setMessage("Şifre başarılı bir şekilde güncellendi.");
            setErrorMessages([]);
        } catch (err) {
            if (err.response && err.response.data && err.response.data.errors) {
                setErrorMessages(err.response.data.errors);
            } else {
                setErrorMessages(["Şifre sıfırlama işlemi sırasında bir hata oluştu."]);
            }
            setMessage('');
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3} sx={{ padding: 10 }}>
                <Typography variant="h5" gutterBottom>
                    Şifre Sıfırlama
                </Typography>
                <form onSubmit={(e) => { e.preventDefault(); handleResetPassword(); }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                type="password"
                                id="newPassword"
                                label="Yeni Şifre"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                type="password"
                                id="confirmPassword"
                                label="Yeni Şifre Onay"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                            >
                                Şifreyi Sıfırla
                            </Button>
                            {errorMessages.length > 0 && (
                                <div>
                                    {errorMessages.map((errMsg, index) => (
                                        <Typography key={index} color="red" variant="body2" sx={{ marginTop: 2 }}>
                                            {errMsg}
                                        </Typography>
                                    ))}
                                </div>
                            )}
                        </Grid>
                    </Grid>
                </form>
                {message && <Typography color="green" variant="body2" sx={{ marginTop: 2 }}>{message}</Typography>}
            </Paper>
        </Container>
    );
}

export default ResetPassword;