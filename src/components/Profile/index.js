import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { getUser } from '../../services/auth';
import { Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {
    fontSize: 16
  },
  '@media only screen and (min-width: 992px)': {
    root: {
      minWidth: 500
    }
  }
}))

export default function Profile({open, onClose}) {
  const classes = useStyles()

  const [isOpen, setIsOpen] = React.useState(false);
  const profile = getUser()

  useEffect(() => {
    setIsOpen(open)
  }, [open]);

  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClose = () => {
    onClose(false);
  };

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">Perfil</DialogTitle>

        <DialogContent className={classes.root}>
          <div style={{ marginBottom: 6 }}>
            <strong>Nome: </strong>{profile.nomeCompleto}
          </div>

          <div style={{ marginBottom: 6 }}>
            <strong>Matrícula: </strong>{profile.matricula}
          </div>

          <div style={{ marginBottom: 6 }}>
            <strong>Filial: </strong><Chip label={profile.filial} />
          </div>

          <div style={{ marginBottom: 6 }}>
            <strong>Região: </strong><Chip label={`${profile.idRegiao} - ${profile.regiao}`} />
          </div>

          <div style={{ marginBottom: 6 }}>
            <strong>Cargo: </strong><Chip label={profile.cargo} />
          </div>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}